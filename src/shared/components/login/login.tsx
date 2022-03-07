import React from "react";
import CN from "classnames";
import SCSS from "./login.module.scss";
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as ProjectTitle } from './basic-name.svg';
import * as Modernizr from "modernizr";

// Modernizr.on('webp', function (result) {
//   if (result) {
//     // Has WebP support
//     console.log("Modernizer recongised this brower as being able to use Webp", result);
//   }
//   else {
//     // No WebP support
//     console.log("Modernizer didn't recongised this brower as being able to use Webp")
//   }
// });

export default function Login() {

  const signIn = () => {
    console.log("sign in button clicked")
  }

  const signUp = () => {
    console.log("sign button button clicked")
  }

  const basicButton = "text-base sm:text-lg text-white font-semibold w-full px-8 py-2 rounded-md"

  return (
    <div className={CN(SCSS["login--screen--background"], "flex justify-center items-center px-8 py-6")}>

      <div className="mx-w-screen-md flex flex-col w-9/12 md:w-80">
        <Logo className={CN(SCSS["logo"], "mx-auto mb-6 md:mb-8")} aria-label="Project logo." />
        <ProjectTitle className={CN(SCSS["project-title--image"], "mx-auto mb-6 md:mb-8")}
          aria-label="Project title, 'Search and Found'." />

        <button className={CN(basicButton, "bg-teal-500 mb-6 md:mb-8")}
          onClick={() => signIn()}>Login</button>

        <button className={CN(basicButton, "bg-none border-4 border-slate-50 border-solid")}
          onClick={() => signUp()}>Sign Up</button>
      </div>

    </div>
  )
}