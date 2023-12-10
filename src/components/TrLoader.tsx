import React from "react";

export default function TrLoader({ colSpan }: { colSpan: number }) {
	return (
		<tr>
			<td colSpan={colSpan} className="text-center">
				<span className="loading loading-spinner loading-md"></span>
			</td>
		</tr>
	);
}
