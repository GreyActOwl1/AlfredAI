'use client'
import { title } from "@/components/primitives";
import GeminiDemo from "@/components/GeminiDemo";
import {Tabs, Tab, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useState } from "react";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string | Date | undefined;
}

export default function DocsPage() {
  const [chats, setChats] = useState<{ name: string; multiMessages: Message[]; }[]>([]);
  const [chatName, setChatName] = useState('');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  function addChat() {
    console.log("addChat()");
    const newChat = { name: chatName, multiMessages: [] as Message[] };
    const updatedChats = [...chats, newChat];
    
    setChats(updatedChats);


    setChatName("");
    console.log("newChat: " + JSON.stringify(newChat));
    console.log("updatedChats: " + JSON.stringify(updatedChats));

  }


  return (
    <div
      className="flex flex-col gap-4"
    >
      <h1 className={title()}>Docs</h1>
      <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  value={chatName}
                  onChange={(e) => {
                    setChatName(e.target.value);
                    console.log(chatName);
                  }}
                  className="border p-2 mb-4 w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    console.log("onPress")
                    addChat();
                    console.log('chats: ' + JSON.stringify(chats));
                    onClose();
                  }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onClick={onOpen}
      >Add Chat</Button>
      {
        chats.length > 0 && (
          <div className="flex flex-col px-4">
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" placement='end' size="lg">
                
                {chats.map((chat, index) => (
                  <Tab key={index} title={
                      <>
                        <div className="flex flex-row  justify-between">
                          <div className="flex-1 truncate ">{chat.name}</div>
                            <Button
                              color="danger"
                              isIconOnly
                              size="sm"
                              className="ml-2"
                              onPress={() => {
                                const updatedChats = chats.filter((c, i) => c.name !== chats[index].name);
                                setChats(updatedChats);
                              }}
                            >
                              X
                            </Button>
                        </div>
                      </>
                    }>
                    <GeminiDemo
                      chatName={chat.name}
                      multiMessages={chat.multiMessages}
                      setMultiMessages={(messages: Message[]) => {
                        const updatedChat = {
                          ...chat,
                          multiMessages: messages,
                        };
                        const updatedChats = chats.map((c, i) => (i === index ? updatedChat : c));
                        setChats(updatedChats);
                      }}
                    />
                  </Tab>
                ))}
              </Tabs>
            </div>
          </div>
        )
      }
      
      {/* <GeminiDemo /> */}
    </div>
  );
}
