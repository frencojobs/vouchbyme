import { Auth } from '@aws-amplify/auth'
import {
  Button,
  Input,
  Link,
  Row,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import ChevronLeft from '@geist-ui/react-icons/chevronLeft'
import { withSSRContext } from 'aws-amplify'
import { useAtom } from 'jotai'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'
import { signInCacheAtom } from '../../state/atoms'

const Confirm: NextPage = () => {
  const router = useRouter()
  const query = router.query['username'] as string
  const [signInCache, setSignInCache] = useAtom(signInCacheAtom)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [, addToast] = useToasts()
  const username = useInput(query ?? '')
  const code = useInput('')

  const confirm = async () => {
    try {
      setLoading(true)
      await Auth.confirmSignUp(username.state, code.state)

      if (signInCache !== null) {
        await Auth.signIn(signInCache)
        router.push(signInCache.next ?? '/dashboard')
      } else {
        router.push('/auth/sign-in')
      }
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.hasOwnProperty('message')) {
        addToast({
          type: 'error',
          text: e.message,
        })
      } else {
        console.error(e)
      }
    } finally {
      setLoading(false)
      setSignInCache(null)
    }
  }

  const resend = async () => {
    try {
      setSending(true)
      await Auth.resendSignUp(username.state)
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.hasOwnProperty('message')) {
        addToast({
          type: 'error',
          text: e.message,
        })
      } else {
        console.error(e)
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Text h3>Confirm your account</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%">
          Username
        </Input>
        <Spacer />
        <Input type="number" {...code.bindings} width="100%">
          Confirmation Code
        </Input>
        <Text type="secondary" className="text-sm">
          Didn&apos;t receive?{' '}
          <Link
            href="#"
            color
            onClick={() => (sending ? () => null : resend())}>
            Resend
          </Link>
        </Text>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={confirm}>
            <Text b>Confirm</Text>
          </Button>
          <Spacer className="block sm:hidden" />
          <Row>
            <ChevronLeft color="#0070f3" size={20} />
            <NextLink href="/auth/sign-in">
              <Link color>Sign In</Link>
            </NextLink>
          </Row>
        </div>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req })

  try {
    await Auth.currentAuthenticatedUser()
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  } catch (e) {
    return { props: {} }
  }
}

export default Confirm
