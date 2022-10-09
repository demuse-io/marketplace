import { storeAsBlob } from "utils/nftStorage";
import { authorizedClient, hasTransactionBeenIndexed, lensHub, publish } from "./lens-api";
import omitDeep from "omit-deep";
import { ethers, TypedDataDomain } from "ethers";

const profileId = "0xa9a5";
export const post = async (token: string, title: string, description: string, link: string) => {
    const cl = authorizedClient(token);
    const content = `🎵 🎵 🎵 !!! ${title} !!! 🎵 🎵 🎵  \n ${description}`;
    const ipfsResult = await storeAsBlob({
      version: "2.0.0",
      mainContentFocus: "AUDIO",
      metadata_id: "b9254eb7-a95d-48e4-a2d4-6caf27b6ace1",
      description: content,
      locale: "en-US",
      content: content,
      attributes: [],
      tags: ["demuse_post"],
      appId: "deMuse",
      name: "Music",
      media: [link]
    });
    console.log("create post: ipfs result", ipfsResult);

    const published = await cl
      .mutation(publish(profileId, ipfsResult))
      .toPromise();
    console.log("publish", published.data);
    console.log(published.data);

    // await signCreatePostTypedData()
    return published.data.createPostTypedData;
    // await fetchProfile();
  };

  const omit = (object: any, name: any) => {
    return omitDeep(object, name);
  };

  const splitSignature = (signature: string) => {
    return ethers.utils.splitSignature(signature);
  };

  const signedTypeData = async (domain: TypedDataDomain, types: Record<string, any>, value: Record<string, any>) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // remove the __typedname from the signature!
    return signer._signTypedData(
      omit(domain, "__typename"),
      omit(types, "__typename"),
      omit(value, "__typename")
    );
  };
  const hasTxBeenIndexed = async (request: string, accessToken: string) => {
    const result = await authorizedClient(accessToken)
      .query(hasTransactionBeenIndexed(request))
      .toPromise();
    console.log(result.data);
    return result.data.hasTxHashBeenIndexed;
  };

  const pollUntilIndexed = async (tx: string, accessToken: string) => {
    while (true) {
      const response = await hasTxBeenIndexed(tx, accessToken);
      console.log("pool until indexed: result", response);

      if (response.__typename === "TransactionIndexedResult") {
        console.log("pool until indexed: indexed", response.indexed);
        console.log(
          "pool until metadataStatus: metadataStatus",
          response.metadataStatus
        );

        console.log(response.metadataStatus);
        if (response.metadataStatus) {
          if (response.metadataStatus.status === "SUCCESS") {
            return response;
          }

          if (response.metadataStatus.status === "METADATA_VALIDATION_FAILED") {
            throw new Error(response.metadataStatus.status);
          }
        } else {
          if (response.indexed) {
            return response;
          }
        }

        console.log(
          "pool until indexed: sleep for 1500 milliseconds then try again"
        );
        // sleep for a second before trying again
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else {
        // it got reverted and failed!
        throw new Error(response.reason);
      }
    }
  };
  export const signCreatePostTypedData = async (accessToken: string, title: string, description: string, link: string) => {
    const result = await post(accessToken, title, description, link);
    console.log("create post: createPostTypedData", result);

    const typedData = result.typedData;
    console.log("create post: typedData", typedData);

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    console.log("create post: signature", signature);

    const signedResult = { result, signature };

    console.log("create post: signedResult", signedResult);

    const { v, r, s } = splitSignature(signedResult.signature);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const tx = await lensHub(signer).postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log("create post: tx hash", tx.hash);

    console.log("create post: poll until indexed");
    const indexedResult = await pollUntilIndexed(tx.hash, accessToken);

    console.log("create post: profile has been indexed");

    const logs = indexedResult.txReceipt.logs;

    console.log("create post: logs", logs);

    const topicId = ethers.utils.id(
      "PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)"
    );
    console.log("topicid we care about", topicId);

    const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
    console.log("create post: created log", profileCreatedLog);

    let profileCreatedEventLog = profileCreatedLog.topics;
    console.log("create post: created event logs", profileCreatedEventLog);

    const publicationId = ethers.utils.defaultAbiCoder.decode(
      ["uint256"],
      profileCreatedEventLog[2]
    )[0];

    console.log("create post: contract publication id", publicationId);
    console.log(
      "create post: internal publication id",
      profileId + "-" + publicationId
    );
  };
