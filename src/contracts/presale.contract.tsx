import { ethers } from "ethers";
import { presaleAbi } from "../abis/presale.abi";
const presaleAddress = "0x9F245626e59A091f8E47883C530E09E11e87f457";

export const presaleContract: any = (signer: any) =>
  new ethers.Contract(presaleAddress, presaleAbi, signer);

export const uploadNFT = () => {
    
}
export const mintPresale = async (signer: any, metadata: string, shares: number, totalPrice: number) => {
  const contrCall = await presaleContract(signer).mint( metadata, totalPrice, shares * 10);
  const tx = await contrCall.wait();

  console.log(tx);

};


export const fetchPresale = async (signer: any, tokenId: number) => {
  try{
    const tokenURI = await presaleContract(signer).tokenURI(tokenId);
    console.log(tokenURI)
    if(tokenURI) {
      const uri = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
      const resp = await fetch(uri);
      const a = await resp.json();
      return a;
    } else 
      return undefined;
  } catch {
    return undefined;
  }
  

};
