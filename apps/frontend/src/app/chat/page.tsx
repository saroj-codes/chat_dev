/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import Hamburger from '../components/icons/hamburger';
import SearchIcon from '../components/icons/search';
import AddIcon from '../components/icons/add';
import SendIcon from '../components/icons/send';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Button,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
  Avatar,
} from '@chakra-ui/react';
import ChannelIcon from '../components/icons/channel';
import ProfileIcon from '../components/icons/profile';
import EmojiIcon from '../components/icons/emoji';

const Chat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showEmoji, setShowEmoji] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleOpenEmoji = () => {
    setShowEmoji(!showEmoji);
  };
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  console.log(isEnabled);

  return (
    <div className="h-screen flex fixed w-full ">
      <div className="w-[25%] border-r-2 border-[#BBC8FC]">
        <div className="pt-4 px-4 flex items-center gap-4">
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create New Channel</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form action="">
                  <FormLabel as="legend">Channel Name</FormLabel>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Channel Name"
                      className="border-2 border-[#BBC8FC] pl-3 pr-4 w-full py-2 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                    />
                  </div>
                  <FormLabel as="legend" className="pt-3">
                    Number of Participants
                  </FormLabel>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Participants"
                      className="border-2 border-[#BBC8FC] pl-3 pr-4 w-full py-2 bg-[#E9EEFE] text-[#C3C8EC] rounded-md placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
                    />
                  </div>
                  <FormLabel as="legend" className="pt-3">
                    IsPublic
                  </FormLabel>
                  <Switch
                    size="md"
                    onChange={toggleSwitch}
                    checked={isEnabled}
                  />
                </form>
              </ModalBody>

              <ModalFooter className="flex gap-4">
                <Button bg="#BBC8FC" textColor="white">
                  Create
                </Button>
                <Button colorScheme="red" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<Hamburger />}
              variant="outline"
            />
            <MenuList>
              <div className="px-2 pb-3 pt-1 flex items-center gap-2">
                <Avatar
                  name="Saroj Gurung"
                  size="md"
                  src="https://bit.ly/dan-abramov"
                />
                <div className="text-lg font-semibold">Saroj Gurung</div>
              </div>
              <MenuItem icon={<ChannelIcon />} onClick={onOpen}>
                New Channel
              </MenuItem>
              <MenuItem icon={<ProfileIcon />}>Sign Out</MenuItem>
            </MenuList>
          </Menu>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border-2 border-[#BBC8FC] pl-10 pr-4 py-1 bg-[#E9EEFE] text-[#C3C8EC] rounded-3xl placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
            />
            <div
              className="absolute top-2 left-0 pl-3.5  
                    flex items-center  
                    pointer-events-none"
            >
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex-1">
          <header className="bg-[#E9EEFE] p-4 text-gray-700 flex items-center gap-3">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full"
                src="https://bit.ly/dan-abramov"
                alt=""
              />
              <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <h1 className="text-2xl font-semibold">Saroj Gurung</h1>
          </header>

          {/* {showEmoji && (
              <div className="top-56 left-56 w-2/6 bg-red-500 relative ">
                <EmojiPicker />
              </div>
            )} */}
          <div className="h-screen overflow-y-auto p-4 pb-36">
            <div className="flex mb-4 cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <div className="flex max-w-96 rounded-t-lg rounded-br-lg bg-[#E9EAED] p-3 gap-3">
                  <p className="text-gray-700">Hey Bob, how's it going?</p>
                </div>
                <div className="flex text-sm pt-1 text-gray-500">3:04 AM</div>
              </div>
            </div>

            <div className="flex justify-end mb-4 cursor-pointer">
              <div>
                <div className="flex max-w-96 bg-[#BBC8FC] text-white rounded-t-lg rounded-bl-lg p-3 gap-3">
                  <p>
                    Hi Alice! I'm good, just finished a great book. How about
                    you?
                  </p>
                </div>
                <div className="flex items-end justify-end text-sm pt-1 text-gray-500">
                  2:14 PM
                </div>
              </div>

              <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img
                  src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="My Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>

            <div className="flex mb-4 cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <div className="flex max-w-96 rounded-t-lg rounded-br-lg bg-[#E9EAED]  p-3 gap-3">
                  <p className="text-gray-700">Hoorayy!!</p>
                </div>
                <div className="flex text-sm pt-1 text-gray-500">5:30 AM</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center gap-4">
            <AddIcon />
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full border-2 text-lg border-[#BBC8FC] pl-5 pr-4 py-1.5 bg-[#E9EEFE] text-[#C3C8EC] rounded-3xl placeholder:text-[#C3C8EC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
              />
              <div
                onClick={handleOpenEmoji}
                className="absolute top-2 right-0 pr-4  
                    flex items-center  
                    cursor-pointer"
              >
                <EmojiIcon />
              </div>
            </div>

            <SendIcon />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
