import { startCase } from 'lodash';

import React from 'react';
import OrgControl from './_components/org-control';
import { auth } from '@clerk/nextjs';

export async function generateMetaData() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || 'Organization'),
  };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
