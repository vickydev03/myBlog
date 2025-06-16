"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import "./css/Search.css";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWindowSize } from "react-use";
import { useArticleFilters } from "@/modules/article/hooks/useArticleFilterHook";
import { motion } from "motion/react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Media } from "@/payload-types";
import { toast } from "sonner";
import MyLogo from "./MyLogo";
function Navbar() {
  const path = usePathname();
  // console.log(path);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [hideOther, setHideOther] = useState(false);
  const router = useRouter();
  const [, setFilters] = useArticleFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Only here, for form submission
    // console.log("Form submitted with:", value);
    if (path === "/search") {
      setFilters({ search: value });
    } else {
      router.push(`/search?search=${value}`);
    }
  };
  const { width } = useWindowSize();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const logout = useMutation(
    trpc.auth.logout.mutationOptions({
      onSuccess: () => {
        // revalidatePath("/")
        queryClient.invalidateQueries();
        toast.success("you are logout sucessfully");
      },
      onError: () => {
        toast.error("something went wrong");
      },
    })
  );

  const handleLogout = () => {
    logout.mutate();
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-center navbar t px-4 py-[2px] b xl:py-5 dark:dark-b "
    >
      <div className="flex items-center justify-center gap-4 ">
        <Link href={"/"} aria-label="FinoBlitz">
          {/* <h2 className="font-bold  text-4xl flex items-center justify-center "> */}
          <MyLogo width={"178"} height="44" />
          {/* </h2> */}
        </Link>
        <div className="hidden sm:block ">
          <SearchBar path={path} />
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        {width <= 640 && (
          <form onSubmit={handleSubmit}>
            <div className=" flex items-center relative w-fit sm:hidden gap-2">
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Search"
                onFocus={() => {
                  setHideOther(true);
                  setValue("");
                }}
                onBlur={() => {
                  setValue("");
                  setHideOther(false);
                }}
                // value={value}
                // onChange={handleChange}
                
                className=" rounded-full border-none outline-none bg-[#f9f9f9f9] focus-visible:ring-0 focus-visible:outline-none input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="icon absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </form>
        )}
        <div
          className={cn(
            " flex items-center  gap-4 px-2 lg:px-4 ",
            hideOther && "hidden"
          )}
        >
          {/* <DarkmodeBtn /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>

          {session?.data?.user ? (
            <Profile
              image={session.data.user.image}
              handleLogout={handleLogout}
              admin={session.data.user.roles?.includes("admin")}
            />
          ) : (
            <LoginBtn />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;

const SearchBar = ({ path }: { path: string }) => {
  const [value, setValue] = useState("");
  const [, setFilters] = useArticleFilters();

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Only here, for form submission
    // console.log("Form submitted with:", value);
    if (path === "search") {
      setFilters({ search: value });
    } else {
      router.push(`/search?search=${value}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <div className="flex items-center bg-[#f9f9f9f9] overflow-hidden  rounded-full px-4    ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          // stroke="[]"
          className="size-6 stroke-[#7F7F7F]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <Input
          placeholder="Search"
          value={value}
          onChange={handleChange}
          className="w-36 md:w-44 lg:48 xl:w-56 lg:h-5 xl:h-10 rounded-full border-none outline-none bg-inherit focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
    </form>
  );
};

const LoginBtn = () => {
  return (
    <Button
      variant={"elevated"}
      className="lg:w-18 h-8 mr-1 md:mr-2 lg:mr-4 "
      asChild
    >
      <Link href={"/login"} prefetch>
        Login
      </Link>
    </Button>
  );
};

export const Profile = ({
  image,
  handleLogout,
  admin,
}: {
  image: Media | string | null | undefined;
  handleLogout: () => void;
  admin: boolean | undefined;
}) => {
  const imageUrl =
    typeof image === "string"
      ? image
      : image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const imageAlt = typeof image === "object" ? image?.alt : "";
  // image
  // const handleDashboard=
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer ">
          <Avatar className="w-8 h-8">
            <AvatarImage src={imageUrl} alt={imageAlt || "user"} />
            <AvatarFallback>{imageAlt}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white border border-gray-200 shadow-md mt-2 rounded-xl w-48 p-2"
      >
        <DropdownMenuLabel className="text-sm font-medium text-gray-600 px-2 py-1">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-200" />
        {admin && (
          <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100 rounded-md transition-colors b">
            <Button
              variant="link"
              className="text-sm font-medium text-gray-700 w-full text-left p-0 h-auto border-none"
              asChild
            >
              <Link href={"/admin"} prefetch>
                Dashboard
              </Link>
            </Button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100 rounded-md transition-color">
          <Button
            variant="link"
            className="text-sm font-medium text-gray-700 w-full text-left p-0 h-auto border-none"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
