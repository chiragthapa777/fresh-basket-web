"use client";
import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	MdOutlineAdd,
	MdOutlineKeyboardArrowLeft,
	MdModeEditOutline,
} from "react-icons/md";

export default function page() {
	const router = useRouter();
	const [result, setresult] = useState(null)
	const {openModal} = useModal();
	const edit = () =>{
		// openModal(<ProductFrom />, setresult);
	}

	useEffect(() => {
	  console.log(result)
	}, [result])
	
	return (
		<div>
			<div className="flex">
				<button
					className="btn btn-xs btn-link capitalize my-auto"
					onClick={() => {
						router.back();
					}}
				>
					<MdOutlineKeyboardArrowLeft /> Back
				</button>
				<div className="text-xs breadcrumbs ml-2">
					<ul>
						<li>
							<a>Home</a>
						</li>
						<li className="underline">
							<a>Stock</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="w-full ">
				<div className="header p-2 flex justify-between items-center  ">
					<h1 className="font-semibold text-xl">Stocks</h1>
					<div>
						<button
							className="btn btn-primary btn-sm capitalize text-xs"
							onClick={() => {
								router.push("/stock/add");
							}}
						>
							<MdOutlineAdd className="text-sm" /> Add Stock
						</button>
					</div>
				</div>
				<div className="content p-2">
					<div className="overflow-x-auto">
						<table className="table table-sm border drop-shadow-2xl rounded-2xl ">
							{/* head */}
							<thead className="bg-base-300/10">
								<tr>
									<th></th>
									<th>Name</th>
									<th>Job</th>
									<th>Favorite Color</th>
									<th></th>
								</tr>
							</thead>
							<tbody className="bg-base-100">
								{/* row 1 */}
								<tr>
									<th>1</th>
									<td>Cy Ganderton</td>
									<td>Quality Control Specialist</td>
									<td>Blue</td>
									<td>
										<div
											className="btn btn-success btn-xs btn-outline"
											onClick={edit}
										>
											<MdModeEditOutline />
										</div>
									</td>
								</tr>
								{/* row 2 */}
								<tr>
									<th>2</th>
									<td>Hart Hagerty</td>
									<td>Desktop Support Technician</td>
									<td>Purple</td>
									<td>Purple</td>
								</tr>
								{/* row 3 */}
								<tr>
									<th>3</th>
									<td>Brice Swyre</td>
									<td>Tax Accountant</td>
									<td>Red</td>
									<td>Red</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
