import React from 'react';
import { useState } from "react";
import { Icon } from '@iconify/react';
import baselineSearch from '@iconify/icons-ic/baseline-search';

import './search_bar.css';

export default function SearchBar(
{
  onSearch
})
{
  const [query, setQuery] = useState("");

  const search = () =>
  {
    onSearch(query);
  }

  const updateQuery = (value) =>
  {
    setQuery(value);
    onSearch(value);
  }

  return (
    <div className='search-bar-wrapper'>
      <input type='text' onChange={ event => updateQuery(event.target.value) }/>
      <button onClick={ search }><Icon icon={baselineSearch}/></button>
    </div>
  );
}