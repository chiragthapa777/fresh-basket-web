"use client";

import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext<any>(null);
export function ModalProvider({ children }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [resultCallBack, setResultCallBack] =
		useState<(data: any) => any | undefined>();
	const [modalResult, setModalResult] = useState(null);

	const resetModal = () => {
		setIsModalOpen(false);
		setModalContent(null);
		setResultCallBack((data: any) => {});
		setModalResult(null);
	};

	const openModal = (content: any, resultCallBack?: () => any) => {
		resetModal();
		setIsModalOpen(true);
		setModalContent(content);
		if (resultCallBack) {
			setResultCallBack(resultCallBack);
		}
	};

	const closeModal = (data?: any) => {
		if (resultCallBack) {
			resultCallBack(data);
		}
		resetModal()
	};

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
				modalContent,
				isModalOpen,
				modalResult,
				setModalResult,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}

export const useModal = () => useContext(ModalContext);
