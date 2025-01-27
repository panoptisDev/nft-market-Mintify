import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks';
import { useAddressContext } from '../../context/addressContext';
const Navbar = () => {
  const { connectWallet, address, chainId } = useWeb3();
  const { handleAddress } = useAddressContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const { switchNetwork } = useSwitchNetwork();
  function menuSwitch() {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true);
  }
  function closeMenu() {
    menuOpen ? menuSwitch : null;
  }
  const checkWallet = () => {
    connectWallet('injected');
    if (address) {
      handleAddress(address);
    }
  };

  return (
    <div
      className="sticky top-0  px-5 py-3 font-semibold z-50 bg-[#111827] backdrop-filter backdrop-blur-md bg-opacity-30 text-white text-base"
      onClick={closeMenu}
    >
      {/* Full navbar  */}
      <div className="w-full md:flex justify-between items-center space-x-5 hidden ">
        {/* logo comes here */}
        <div className='flex flex-row min-w-fit'>
        <Link href="/" passHref>
            <h1 className='font-semibold hover:text-white cursor-pointer text-[32px]'>Mintify <span className='text-[#F97316]'>.</span></h1>
        </Link>
          {/* menu */}
          <ul className="flex justify-between space-x-4 text-light-gray ml-5">
            <Link href="/marketplace" passHref>
              <li className="hover:text-white cursor-pointer">Marketplace</li>
            </Link>
            <Link href="/games" passHref>
              <li className="hover:text-white cursor-pointer">Games</li>
            </Link>
            <Link href="/explore" passHref>
              <li className="hover:text-white cursor-pointer">Explore</li>
            </Link>
          </ul>
        </div>

        {/* buttons  */}
        <div className="space-x-2 flex">
          {/* search  */}
          <Link href="/create" passHref>
            <button className="border-2 border-solid w-32 bg-[#F97316] px-2 py-1 rounded-md font-bold hover:bg-black hover:text-white">
              Create
            </button>
          </Link>
          {!address ? (
            <button
              className="border-2 border-solid px-2 py-1 rounded-md font-bold hover:bg-white hover:text-purple"
              onClick={() => checkWallet()}
            >
              Connect
            </button>
          ) : chainId !== 4 ? (
            <button
              className="border-2 border-solid px-2 py-1 rounded-md  font-bold hover:bg-white hover:text-purple flex items-center"
              onClick={() => switchNetwork(4)}
            >
              Switch Network
            </button>
          ) : (
            <Link href={`/profile`} passHref>
              <button className="border-2 border-solid px-2 py-1 rounded-md  font-bold hover:bg-white hover:text-purple flex items-center">
                <FaEthereum />
                {address.substring(0, 6) + '...' + address.substring(address.length - 4)}
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile view navbar */}
      <div className="md:hidden flex justify-between items-center bg-black">
        <Link href="/" passHref>
          <div className="logo cursor-pointer"></div>
        </Link>
        <div className="flex space-x-5 text-3xl">
          <AiOutlineMenu onClick={menuSwitch} className={menuOpen ? 'hidden' : 'cursor-pointer'} />
          <AiOutlineCloseCircle
            onClick={menuSwitch}
            className={!menuOpen ? 'hidden' : 'cursor-pointer'}
          />
          <div
            className={
              menuOpen ? 'max-w-full absolute top-14 right-5  bg-gray rounded-md' : 'hidden'
            }
          >
            <div className="relative z-50 space-y-2 text-lg p-7 border-solid border-white border-2 rounded-md">
              <Link href="/marketplace" passHref>
                <p className=" cursor-pointer hover:text-light-purple">Marketplace</p>
              </Link>
              <Link href="/games" passHref>
                <p className="hover:text-ligt-purple cursor-pointer hover:text-light-purple">
                  Games
                </p>
              </Link>
              <Link href="/explore" passHref>
                <p className="hover:text-ligt-purple cursor-pointer hover:text-light-purple">
                  Explore
                </p>
              </Link>

              <Link href="/create" passHref>
                <button className="m-auto border-2 border-solid border-purple px-2 py-1 rounded-md font-bold bg-purple hover:bg-black">
                  Create
                </button>
              </Link>
              <p></p>
              {!address ? (
                <button
                  className="border-2 border-solid px-2 py-1 rounded-md  font-bold hover:bg-white hover:text-purple"
                  onClick={() => checkWallet()}
                >
                  Connect
                </button>
              ) : chainId !== 4 ? (
                <button
                  className="border-2 border-solid px-2 py-1 rounded-md  font-bold hover:bg-white hover:text-purple flex items-center"
                  onClick={() => switchNetwork(4)}
                >
                  Switch Network
                </button>
              ) : (
                <Link href="/profile">
                  <button className="border-2 border-solid px-2 py-1 rounded-md  font-bold hover:bg-white hover:text-purple flex items-center">
                    <FaEthereum />
                    {address.substring(0, 6) + '...' + address.substring(address.length - 4)}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;