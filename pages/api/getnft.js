import { ThirdwebSDK } from '@3rdweb/sdk';
import { ethers } from 'ethers';

export default async function mint(req, res) {
  const rpcUrl = 'goerli';

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, ethers.getDefaultProvider(rpcUrl));

  const nftCollectionAddress = '0xfCfD2B2C9898080d93aAa195Ae38701f6FA82C8e';
  const nftCollection = new ThirdwebSDK(wallet).getNFTModule(nftCollectionAddress);

  const { address } = req.body;
  await nftCollection
    .getOwned(address)
    .then((metadata) => {
      res.status(200).json(metadata);
    })
    .catch((err) => {
      res.status(408).json({ error: true });
    });
}
