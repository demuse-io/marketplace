import { NFTStorage } from "nft.storage";
const nftStorage = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY5MmY3MTg0M0Y4MzkzMjU5MjlmOGNGMzIzNThkMkY2RmNGNUU3RjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTI5MTM5NDI3NSwibmFtZSI6ImRlbXVzZSJ9.abZfTRzXNEU1onl-fqHfdsyv1RfPpGsePrDsS3UM3dU' });

export const storeAsBlob = async (json: any) => {
    const encodedJson = new TextEncoder().encode(JSON.stringify(json));
    const blob = new Blob([encodedJson], {
      type: "application/json;charset=utf-8",
    });
    const file = new File([blob], "metadata.json");
    const cid = await nftStorage.storeBlob(file);
    return "ipfs://" + cid;
  };