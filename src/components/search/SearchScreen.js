import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import queryString from "query-string";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();

  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });

  const { searchText } = formValues;
  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5 animate__animated animate__fadeIn">
          <h4>Search Form</h4>

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-outline-primary btn-block">
              Search
            </button>
          </form>
        </div>
        <div className="col-7 animate__animated animate__slideInRight">
          <h4> Results </h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a Hero</div>}

          {q !== "" && heroesFiltered.length === 0 && (
            <div className="alert alert-danger">There is not a hero with: <b>{q}</b></div>
          )}

          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
