import { Spinner, Text } from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { listCollectionsByUsername } from '../../../graphql/queries'
import { collectionsAtom, userAtom } from '../../../state/atoms'
import {
  Collection,
  ListCollectionsByUsernameQuery,
  ListCollectionsByUsernameQueryVariables,
} from '../../../types/api'

export const CollectionsList: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [collections, setCollections] = useAtom(collectionsAtom)

  const loadCollections = async () => {
    if (user) {
      const res = (await API.graphql({
        query: listCollectionsByUsername,
        variables: {
          username: user.username,
        } as ListCollectionsByUsernameQueryVariables,
      })) as { data: ListCollectionsByUsernameQuery }

      setCollections(
        (res.data.listCollectionsByUsername?.items ?? []).map(
          (x) => x as Collection
        )
      )
    }
  }

  useEffect(() => {
    loadCollections()
  }, [])

  if (!collections) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    )
  } else {
    return (
      <>
        {collections.map((c) => (
          <div key={c.id}>
            <Text b h4>
              {c.title}
            </Text>
            {c.posts?.items?.map((p) => (
              <div key={p?.id}>{p?.title}</div>
            ))}
          </div>
        ))}
      </>
    )
  }
}
