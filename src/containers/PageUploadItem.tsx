import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import { create } from "ipfs-core";
import { storeAsBlob } from "utils/nftStorage";
import { mintPresale } from "contracts/presale.contract";
import { ethers } from "ethers";
export interface PageUploadItemProps {
  className?: string;
}

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {
  const [cid, setCID] = useState("");

  const [shares, setShares] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const sharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShares(+e.target.value);
  };
  const totalAmountChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalAmount(+e.target.value);
  };
  
  const descriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("shares", shares);
  };

  async function upload() {
    const metadata = await storeAsBlob({title: name, description, image: cid });
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await mintPresale(signer, metadata, shares, totalAmount);
  }
  const saveToIpfsWithFilename = async ([file]: [any]) => {
    const fileDetails = {
      content: file,
    };

    const options = {
      progress: (prog: any) => console.log(`received: ${prog}`),
    };

    try {
      const repoPath = `ipfs-${Math.random()}`;
      const ipfs = await create({ repo: repoPath });
      const added = await ipfs.add(fileDetails, options);

      const uri = "https://ipfs.io/ipfs/" + added.cid.toString();
      setCID(added.cid.toString());
      console.log(uri);
    } catch (err: any) {
      // setError(err.message)
    }
  };

  const captureFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const fileName = await saveToIpfsWithFilename(event.target.files);
    return fileName;
  };

  return (
    <div className={`nc-PageUploadItem ${className}`} data-nc-id="PageUploadItem">
      <Helmet>
        <title>Create Item || NFT React Template</title>
      </Helmet>
      <div className="container">
        <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold">Presale your NFT</h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">You can set preferred display name, create your profile URL and manage other personal settings.</span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold">Image, Video, Audio, or 3D Model</h3>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</span>
              <div className="mt-5 ">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label htmlFor="file-upload" className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={captureFile} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">PNG, JPG, GIF, MP3, MKV, MP4, WAV</p>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <FormItem label="Item Name">
                <Input placeholder="Awesome song name" onChange={nameChange}/>
              </FormItem>

              <FormItem
                label="Description"
                desc={
                  <div>
                    The description will be included on the item's detail page underneath its image. <span className="text-green-500">Markdown</span> syntax is supported.
                  </div>
                }
              >
                <Textarea rows={6} className="mt-1.5" placeholder="..." onChange={descriptionChange}/>
              </FormItem>

              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                <FormItem label="Shares to sell">
                  <Input placeholder="20%" value={shares} onChange={sharesChange} />
                </FormItem>
                <FormItem label="Total amount to crowdfund">
                  <Input placeholder="$1000" onChange={totalAmountChanges}/>
                </FormItem>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
                <ButtonPrimary className="flex-1" onClick={() => upload()}>
                  Upload item
                </ButtonPrimary>
                {/* <ButtonSecondary className="flex-1">Preview item</ButtonSecondary> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default PageUploadItem;
