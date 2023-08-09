"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MovieRow } from "@/components/MovieRow";
import { movieDB } from "@/libs/movieDB";

export default function SearchResultPage() {
  const router = useRouter();
  const { searchInput } = router.query || {};

  //tip1 : before filtering movie, replace all "%20" with " " (space) in the input
  const processedSearchInput = searchInput
    ? searchInput.replaceAll("%20", " ")
    : "";

  /*
  tip2 : Use "includes" string method to check substring
  Example : "ABC".includes("AB") -> return true

  tip3 : To implement case insensitive searching, use "toLocaleLowerCase" string method
  to convert movie title and searchInput to lower case 
  const filteredMovies = movieDB.filter((movie) =>
    you code here...
  );
  */
  const filteredMovies = movieDB.filter((movie) =>
    movie.title.toLowerCase().includes(processedSearchInput.toLowerCase())
  );

  return (
    <div>
      <p className="fw-bold fs-4 text-center my-0">
        Searching {processedSearchInput}
      </p>
      <p className="fw-bold fs-4 text-center">
        Found {filteredMovies.length} result(s)
      </p>
      {/* Use  "filteredMovies" variable to map-loop rendering MovieRow component */}
      {filteredMovies.map((movie) => (
        <MovieRow key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
