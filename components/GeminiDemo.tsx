"use client";
import { useChat } from "ai/react";
import { title } from "@/components/primitives";
import { useEffect } from "react";
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

const GeminiDemo: React.FC<MyComponentProps> = ({
	chatName,
	multiMessages,
	setMultiMessages,
}) => {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		error,
	} = useChat({
		api: "/api/chat",
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
		<div className="md:p-4 md:w-[1200px]">
			<h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
				{chatName}
			</h1>

			{error && <p className="text-red-500 mt-4">{error.message}</p>}
			{messages.length != 0 && (
				<div className="mt-4 p-4 bg-gray-200 dark:bg-slate-900 w-full rounded-md ">
					{messages.map((m) => (
						<pre
							key={m.id}
							className="whitespace-pre-wrap text-gray-950 dark:text-white break-words w-full"
						>
							{m.role === "user" ? "User: " : "AI: "}
							{m.content}
						</pre>
					))}
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className="flex justify-between h-12 w-full bg-gray-100 dark:bg-black  border border-gray-400 mt-6"
			>
				<input
					type="text"
					value={input}
					onChange={handleInputChange}
					className=" h-full w-[75%] md:w-[90%] outline-none ml-2 bg-gray-100 dark:bg-black dark:text-white text-gray-950"
					placeholder="Enter your prompt"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white w-[25%] md:w-[10%] h-full text-sm md:text-md hover:bg-blue-600"
					disabled={isLoading}
				>
					{isLoading ? "Generating..." : "Submit"}
				</button>
			</form>
		</div>
	);
};
export default GeminiDemo;
