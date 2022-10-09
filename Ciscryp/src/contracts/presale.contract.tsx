import { ethers } from "ethers";
import { presaleAbi } from "../abis/presale.abi";
const presaleAddress = "0x9F245626e59A091f8E47883C530E09E11e87f457";
import { NFTStorage } from "nft.storage";
const nftStorage = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY5MmY3MTg0M0Y4MzkzMjU5MjlmOGNGMzIzNThkMkY2RmNGNUU3RjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTI5MTM5NDI3NSwibmFtZSI6ImRlbXVzZSJ9.abZfTRzXNEU1onl-fqHfdsyv1RfPpGsePrDsS3UM3dU' });

export const presaleContract = (signer: any) =>
  new ethers.Contract(presaleAddress, presaleAbi, signer);

export const uploadNFT = () => {
    
}
export const mint = async () => {


};
