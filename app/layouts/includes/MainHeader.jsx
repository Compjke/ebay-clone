"use client";

import { debounce } from "debounce";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

const MainHeader = () => {
  const [items, setitems] = useState([]);
  const [isSearching, setisSearching] = useState(null);
  const [noresult, setnoresult] = useState(false);
  const inputRef = useRef();

  const handleSearchProduct = debounce(async (e) => {
    if (e.target.value === "") {
      setitems([]);
      return;
    }
    setisSearching(true);

    try {
      const res = await fetch(`/api/products/search-by-name/${e.target.value}`);
      const names = await res.json();
      if (names.length > 0) {
        setitems(names);
        setisSearching(false);
        return;
      }else{
        setitems([]);
        setnoresult(true)
      }

      
      setisSearching(false);
    } catch (err) {
      console.log(err);
      setisSearching(false);
    }
  }, 1000);

  const handleSearchByButtov  = async(name) => {
    const res = await fetch(`/api/products/search-by-name/${name}`);
    const names = await res.json();
      if (names.length > 0) {
        setitems(names);
        setisSearching(false);
        return;
  }else{
        setitems([]);
        setnoresult(true)
      }
}

  return (
    <>
      <div id="MainHeader" className="border-b">
        <div
          className="
          flex
          items-center
          justify-between
          w-full
          mx-auto
          lg:max-w-[1200px]
          "
        >
          <div className="flex items-center w-full bg-yellow-50">
            <div
              className="
                 flex
                 max-md:flex-col 
                 max-md:items-center 
                 lg:justify-start
                 justify-between
                 gap-10
                 lg:max-w-[1150px]
                 w-full
                 px-3
                 py-5
                 mx-auto
                 "
            >
              <Link href={"/"}>
                <Image
                  width={120}
                  height={120}
                  src="/images/logo.svg"
                  alt="logo"
                />
              </Link>

              <div className="w-full">
                <div className="relative">
                  <div className="flex items-center max-md:flex-col max-md:gap-y-2">
                    <div className="flex items-center border-2 border-neutral-400 w-full p-2">
                      <button type="button" className="flex items-center">
                        <GoSearch size={22} />
                      </button>

                      <input
                        onBlur={() => {
                          setnoresult(false)
                          setitems([])
                        }
                        }
                        onChange={handleSearchProduct}
                        ref={inputRef}
                        type='search'
                        className="
                        w-full
                        placeholder-slate-500
                        md:text-md
                        text-sm
                        pl-3
                        focus:outline-none
                        transition
                        bg-yellow-50
                        text-slate-600
                        "
                        placeholder="Type for search anything..."
                      />

                      {isSearching ? (
                        <BiLoaderCircle className="animate-spin" size={22} />
                      ) : null}

                      {items.length > 0 ? (
                        <div className="absolute bg-slate-50 lg:max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                          {items.map((item) => (
                            <div className="p-1" key={item.id}>
                              <Link
                                href={`/product/${item?.id}`}
                                className="flex items-center justify-between w-full cursor-pointer hover:bg-slate-200 p-1 px-2"
                              >
                                <div className="flex items-center">
                                  <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                  />
                                  <p className="truncate ml-2">{item?.title}</p>
                                </div>
                                <div className="truncate">
                                  $ {(item.price / 100).toFixed(2)}
                                </div>
                              </Link>
                            </div>
                          ))}
                          <div
                            onClick={() => {
                              setitems([]);
                            }}
                            className="text-center text-blue-300 font-bold"
                          >
                            ^
                          </div>
                        </div>
                      ) : null}

                      {(noresult && inputRef.current.value !== '')  && (
                        <div className="absolute py-1 top-12 left-0 bg-slate-200 w-full rounded-sm z-10">
                          <span className='px-3 block'>no results</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleSearchByButtov(inputRef.current.value)}
                      type="button"
                      className="
                    flex
                    items-center 
                    bg-sky-500
                    md:text-sm
                    text-xs
                    font-semibold
                    text-white
                    p-[11px]
                    ml-2
                    px-14 
                    rounded-sm
                    hover:opacity-80
                    transition
                    "
                    >
                      Search
                    </button>

                    <div className="text-xs px-2 hover:text-sky-500 cursor-pointer">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
