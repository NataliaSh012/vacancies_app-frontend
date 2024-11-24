import React from 'react';

import classes from './TemplateName.module.scss';

import type { TemplateNameComponentProps } from './TemplateName.type';

export const TemplateName: React.FC<TemplateNameComponentProps> = () => {
  return <div className={classes.container}>I'm a Template Component!</div>;
};
