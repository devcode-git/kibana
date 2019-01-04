/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { i18n as i18nCore } from '@kbn/i18n';

import { ElementFactory } from '../elements/types';
import { elementStringFactory } from './index';

export const applyElementStrings = (
  elements: ElementFactory[],
  i18n: typeof i18nCore = i18nCore
) => {
  const elementStrings = elementStringFactory(i18n);

  return elements.map(spec => {
    const result = spec();
    const { name } = result;
    const strings = elementStrings[name];

    // If we have registered strings for this spec, we should replace any that are available.
    if (strings) {
      const { displayName, help } = strings;
      // If the function has a registered help string, replace it on the spec.
      if (help) {
        result.help = help;
      }

      if (displayName) {
        result.displayName = displayName;
      }
    }

    return () => result;
  });
};
