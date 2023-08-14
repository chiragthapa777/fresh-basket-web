"use client";
import { useModal } from "@/contexts/ModalContext";
import React from "react";
import {MdClose} from "react-icons/md"

export default function Modal() {
	const modal = useModal();
  const {isModalOpen, closeModal, modalContent, resultCallBack} = modal
	const [showModal, setShowModal] = React.useState(false);
	return (
		<>
			{isModalOpen ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
									<h3 className="text-2xl font-semibold">
										Modal Title
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-error   float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => closeModal()}
									>
										<MdClose />
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									{React.cloneElement(modalContent,{
                    modalCallBack : resultCallBack
                  })}
								</div>
								{/*footer*/}
								{/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
									<button
										className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => closeModal()}
									>
										Close
									</button>
									<button
										className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
										type="button"
										onClick={() => closeModal()}
									>
										Save Changes
									</button>
								</div> */}
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
