"use client"
import PageLoader from '@/components/PageLoader'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function notfound() {
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token) {
			router.push("/admin/customer");
		} else {
			router.push("/login");
		}
    }, [])
    
  return (
    <PageLoader />
  )
}
