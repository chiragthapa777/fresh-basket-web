"use client";
import withAuth from "@/hoc/withAuth";
import React from "react";

function page() {
	return <div>Dashboard</div>;
}
export default withAuth(page, { role: "admin" });
