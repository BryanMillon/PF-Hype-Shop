import React from "react";

const Card = ({ title, pictures, price, id }) =>

{
  return (

    <a key={id} href={id} className="group">
      <div className="aspect-w-1 aspect-h-1  h-64 w-full overflow-hidden rounded-lg   xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={pictures[0]}
          alt={pictures[0]}
          className="max-h-200 w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-900">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-800"> ${Math.trunc(price)}</p>
    </a>

  )
}
// 

export default Card;
