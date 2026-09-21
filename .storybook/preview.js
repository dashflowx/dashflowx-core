import React from 'react';
import '../src/index.css';
import { tierForStoryTitle } from './tier';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const tier = tierForStoryTitle(context.title);
      const label = tier === 'pro' ? 'Pro' : 'Free';
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          {
            'data-dashflowx-tier': tier,
            style: {
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 8,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            },
          },
          label
        ),
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
