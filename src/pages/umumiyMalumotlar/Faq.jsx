import React from 'react';
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div>
      часто задаваемые вопросы СТРАНИЦА
      <Link to={'/'} replace>
        <button className={'btn btn-outline'}>ВОЗВРАЩАТЬСЯ</button>
      </Link>
    </div>
  );
};

export default Faq;