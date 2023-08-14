"use client";
import { useModal } from "@/contexts/ModalContext";
import React from "react";

export default function OrderForm({ modalCallback }: any) {
	const { resultCallBack, isModalOpen, closeModal } = useModal();
  const save = () =>{
    if(isModalOpen){
      closeModal("data from modal");
    }
  }
	return <form>this is form
    <button className="btn" onClick={save}>save</button>
  </form>;
}
