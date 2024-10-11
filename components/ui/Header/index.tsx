"use client";

import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import {
  FaSignOutAlt,
  FaCog,
  FaThemeco,
  FaLightbulb,
  FaMoon,
  FaPlus,
  FaHeart,
} from "react-icons/fa";

export default function Header() {
  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="bg-base-100 shadow-2xl rounded-2xl navbar">
      <div className="flex-1 gap-1">
        <a className="gap-0 font-bold text-xl btn btn-ghost" href="/">
          Shopify<b className="text-primary">Spy</b>
        </a>
        <a className="md:flex hidden btn btn-ghost" href="/terms">
          Terms
        </a>
        <a className="md:flex hidden btn btn-ghost" href="/social">
          Social
        </a>
        <a className="md:flex hidden btn btn-ghost" href="/about">
          About
        </a>
        <a
          className="md:flex hidden bg-opacity-40 btn btn-primary"
          href="/donate"
        >
          Donate <FaHeart className="fill-primary" />
        </a>

        <details className="flex md:hidden dropdown">
          <summary className="m-1 btn btn-circle">
            <FaPlus />
          </summary>
          <ul className="z-[1] bg-base-100 shadow p-2 rounded-box w-52 dropdown-content menu">
            <li></li>
            <li>
              <a className="btn btn-ghost" href="/terms">
                Terms
              </a>
            </li>
            <li>
              <a className="btn btn-ghost" href="/social">
                Social
              </a>
            </li>
            <li>
              <a className="btn btn-ghost" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="bg-opacity-40 btn btn-primary" href="/donate">
                Donate <FaHeart className="fill-primary"/>
              </a>
            </li>
          </ul>
        </details>
      </div>
      <div className="flex-none gap-2">
        <button
          onClick={() => {
            const html = document.querySelector("html");
            html?.setAttribute(
              "data-theme",
              theme === "light" ? "dim" : "emerald"
            );
            setTheme(theme === "light" ? "dark" : "light");
          }}
          className="btn btn-circle btn-outline"
        >
          {theme === "light" ? <FaLightbulb /> : <FaMoon />}
        </button>
        <SignedIn>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="a"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="rounded-full w-10">
                {user?.imageUrl ? (
                  <img alt="User Image Profile" src={user?.imageUrl} />
                ) : (
                  <>
                    <div className="avatar online placeholder">
                      <div className="bg-neutral rounded-full w-16 text-neutral-content">
                        <span className="text-xl">
                          {user?.username
                            ?.split(/[ ]+/)
                            .map((e, i) => (i <= 2 ? e : undefined))
                            .filter((e) => e)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="z-[1] bg-base-100 shadow mt-3 p-4 rounded-box w-52 dropdown-content menu menu-sm"
            >
              <li
                onClick={() => {
                  signOut();
                }}
              >
                <a
                  onClick={() => {
                    signOut();
                  }}
                  className="text-error"
                >
                  <FaSignOutAlt />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </SignedIn>
        <SignedOut>
          <button
            onClick={() => {
              openSignIn();
            }}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </SignedOut>
      </div>
    </div>
  );
}
