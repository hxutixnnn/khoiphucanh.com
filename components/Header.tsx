import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <header className="w-full mt-5 border-b-2 pb-4 sm:pb-7 sm:px-4 px-2 flex sm:flex-row space-y-4 flex-col justify-between items-center">
      <Link href="/" className="flex space-x-2 items-center">
        <Image
          alt="header text"
          src="/icon-192.png"
          className="sm:w-14 sm:h-14 w-9 h-9"
          width={36}
          height={36}
        />
        <h1 className="sm:text-2xl text-xl font-bold ml-2 tracking-tight">
          Khôi Phục Ảnh
        </h1>
      </Link>
      <div className="flex flex-wrap items-center space-x-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {[
          ["Khôi phục mặt", "/khoi-phuc-khuon-mat", ""],
          ["Xóa vết xước", "/xoa-vet-xuoc", "Mới"],
        ].map(([navLabel, navPath, badge]) => (
          <Link
            key={navPath}
            href={navPath}
            className={clsx([
              "inline-block px-4 py-3 rounded-lg",
              router.asPath === navPath
                ? "text-white bg-gradient-to-br to-[#6A3DE8] from-[#536DFE]"
                : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
            ])}
          >
            {navLabel}{" "}
            {badge && (
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </div>
      {/* <a
        href="https://vercel.com/templates/next.js/ai-photo-restorer"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-10 sm:h-[34px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a> */}
    </header>
  );
}
