'use client'
import { useChat } from 'ai/react';
import { title } from "@/components/primitives";
import { useEffect } from 'react';

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string | Date | undefined;
}

// Define an interface for your props
interface MyComponentProps {
  chatName: string;
  multiMessages: Message[];
  setMultiMessages: (messages: Message[]) => void;
}


const GeminiDemo: React.FC<MyComponentProps> = ({chatName, multiMessages, setMultiMessages}) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: multiMessages as [],
  });


  useEffect(() => {
    console.log("inside GeminiDemo useEffect");
    // when see a change in messages, update the parent component's state
    setMultiMessages(messages as Message[]);
  }, [messages]);

  useEffect(() => {
    console.log("messages when mounted: " + JSON.stringify(messages));
  }, [messages]);

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{chatName}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="border p-2 mb-4 w-full"
            placeholder="Enter your prompt"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        {messages.length != 0 && (
          <div className="mt-4 p-4 border rounded bg">
              {messages.map(m => (
                <pre key={m.id} className="whitespace-pre-wrap break-words max-w-full">
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
                </pre>
              ))}
          </div>
        )}

      </div>
  );
};

export default GeminiDemo;