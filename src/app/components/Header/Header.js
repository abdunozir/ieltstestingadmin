"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import MobileDrawer from "../Drawer/MobileDrawer";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <header className="bg-white ">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 boder-b-2 border-slate-700"
          aria-label="Global"
        >
          <MobileDrawer />
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              legacyBehavior
              href={"/"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <a className={router.pathname == "/" ? "active" : ""}>
                First Task
              </a>
            </Link>
            <Link
              legacyBehavior
              href={"/second_task"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <a className={router.pathname == "/" ? "active" : ""}>
                Second Task
              </a>
            </Link>
            <Link
              legacyBehavior
              href={"/students"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <a className={router.pathname == "/" ? "active" : ""}>
                Applied Students
              </a>
            </Link>
            <Link
              legacyBehavior
              href={"/order_test"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <a className={router.pathname == "/" ? "active" : ""}>
                Order A test
              </a>
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            ></a>
          </div>
        </nav>
      </header>
    </>
  );
}
