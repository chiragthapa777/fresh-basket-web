"use client";
import React, { useState } from "react";
	
export default function OrderTableRow() {
	const [open, setopen] = useState(false);
	return (
		<>
			<tr>
				<th>3</th>
				<td>Brice Swyre</td>
				<td>Tax Accountant</td>
				<td>Red</td>
				<td>Red</td>
				<td>Tax Accountant</td>
				<td>Red</td>
				<td onClick={() => setopen(!open)}>open</td>
			</tr>
			{open && (
				<tr>
					<td></td>
					<td colSpan={7} className="p-2">
						<table className="table table-sm border drop-shadow-2xl rounded-2xl ">
							<thead className="bg-base-300/10">
								<tr>
									<th className="w-2/10">S.No</th>
									<th className="w-2/10">Name</th>
									<th className="w-2/10">Price</th>
									<th className="w-2/10">Quantity</th>
									<th className="w-2/10">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr className="">
									<td>Test</td>
									<td>Test</td>
									<td>Test</td>
									<td>Test</td>
									<td>Test</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			)}
		</>
	);
}
