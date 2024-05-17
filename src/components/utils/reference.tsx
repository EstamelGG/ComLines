// i18n，参考链接展示器
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    references: { title: string; link: string }[];
  }

const ReferenceLinks: React.FC<Props> = ({ references }) => {
  return (
    <div>
      {references.map((reference, index) => (
        <div key={index}>
          - <Link to={reference.link} target='_blank'>{reference.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default ReferenceLinks;
