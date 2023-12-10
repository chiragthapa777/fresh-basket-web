"use client";
import { title } from "process";
import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md";

type ModalParamType = {
	isOpen: boolean;
	onClose: (data?: any) => void;
	children: ReactNode;
	title?: string;
	size?:"sm"|"md"|"lg"
};

const Modal = ({ isOpen, onClose, children, title, size }: ModalParamType) => {
	if(!size) size="md"
	return (
		<div
			className={`fixed inset-0 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			} flex items-center justify-center z-[9999]`}
		>
			<div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

			<div className={`modal-container bg-white w-full md:w-[70vw] mx-auto rounded shadow-lg z-50 overflow-y-auto `}>
				<div className="modal-content text-left">
					<div className="border-b w-full flex justify-between items-center p-2">
						<h1 className="text-xl">{title || ""}</h1>
						<button onClick={onClose}>
							<MdClose className="text-2xl text-error" />
						</button>
					</div>
					<div className="w-full max-h-[80vh] overflow-auto p-2">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
