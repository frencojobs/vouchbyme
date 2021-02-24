import { Auth } from '@aws-amplify/auth'
import {
  Button,
  Input,
  Link,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { withSSRContext } from 'aws-amplify'
import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'
import { signInCacheAtom } from '../../state/atoms'

const SignIn: NextPage = () => {
  const router = useRouter()
  const next = router.query['next'] as string
  const [, setSignInCache] = useAtom(signInCacheAtom)
  const [loading, setLoading] = useState(false)
  const [, addToast] = useToasts()
  const username = useInput('')
  const password = useInput('')

  const signIn = async () => {
    try {
      setLoading(true)
      await Auth.signIn({
        username: username.state,
        password: password.state,
      })

      router.push(next ?? '/dashboard')
    } catch (e) {
      if (typeof e === 'object' && e !== null) {
        if (e.hasOwnProperty('message')) {
          addToast({
            type: 'error',
            text: e.message,
          })
        }

        if (
          e.hasOwnProperty('code') &&
          e.code === 'UserNotConfirmedException'
        ) {
          setSignInCache({
            username: username.state,
            password: password.state,
            next,
          })

          router.push(
            `/auth/confirm?username=${username.state}`,
            '/auth/confirm'
          )
        }
      } else {
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Text h3>Sign in to your account</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%" size="large">
          Username
        </Input>
        <Spacer />
        <Input.Password {...password.bindings} width="100%" size="large">
          Password
        </Input.Password>
        <Text type="secondary" className="text-sm">
          Forgot password?{' '}
          <NextLink
            href={`/auth/forgot-password?username=${username.state}`}
            as="/auth/forgot-password">
            <Link color>Reset</Link>
          </NextLink>
        </Text>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={signIn}>
            <Text b>Sign In</Text>
          </Button>
          <Spacer className="block sm:hidden" />
          <NextLink href="/auth/sign-up">
            <Link color>Create Account</Link>
          </NextLink>
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

export default SignIn
