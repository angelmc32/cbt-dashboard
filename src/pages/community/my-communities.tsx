import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SimpleLoader from "~/components/common/SimpleLoader";
import Link from "next/link";
import { api } from "~/utils/api";

const MyCommunities = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const { address: userAddress } = useAccount();
  const {
    data: userDeployedCommunities,
    isLoading,
    isFetching,
  } = api.communities.getUserDeployedCommunities.useQuery({
    address: userAddress as string,
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="page !px-0">
      <h1>My Communities</h1>
      {hasMounted ? (
        !userAddress ? (
          <h3>Open menu to connect wallet</h3>
        ) : (
          <div className="max-w-full overflow-x-clip">
            <table className="max-w-full overflow-x-clip">
              <thead>
                <tr className="w-full">
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="flex items-center px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    Safe{" "}
                    <span className="ml-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-center text-lg font-semibold text-gray-900"
                  >
                    NFT
                  </th>
                  <th scope="col" className="relative">
                    To do
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {isLoading || isFetching ? (
                  <tr>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                    <td className="mx-auto">
                      <SimpleLoader />
                    </td>
                  </tr>
                ) : (
                  userDeployedCommunities?.map((community, index) => (
                    <tr key={community.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900">
                        {community.name}
                      </td>
                      <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`h-8 w-8 ${
                            community.address ?? index === 0
                              ? "text-green-700"
                              : "text-neutral-200"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                          />
                        </svg>
                      </td>
                      <td className="whitespace-nowrap px-1 py-2 text-sm">
                        {community.communityAddress ?? index === 0 ? (
                          <div className="h-10 w-10 rounded-full border-2 border-poc_blueSecondary-500 bg-poc_yellowPrimary-500" />
                        ) : (
                          <div className="h-10 w-10 rounded-full border border-dashed border-gray-400 bg-neutral-100" />
                        )}
                      </td>
                      <td className="relative flex justify-center py-4 pl-1 pr-4 text-right text-sm font-medium">
                        {!community.address && index !== 0 ? (
                          <button className="rounded-md bg-poc_yellowPrimary-600 px-2 py-1.5 text-sm">
                            Wallet
                          </button>
                        ) : !community.communityAddress && index !== 0 ? (
                          <button className="rounded-md bg-poc_blueSecondary-500 px-2 py-1.5 text-sm text-poc_whiteAlmost">
                            Membership
                          </button>
                        ) : (
                          <Link
                            href={`/community/${community.address ?? "demo"}`}
                            className="px-2 py-1.5 text-sm"
                          >
                            Explore
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <SimpleLoader />
      )}
    </div>
  );
};

export default MyCommunities;
