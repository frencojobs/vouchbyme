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
import ChevronLeftIcon from '@geist-ui/react-icons/chevronLeft'
import { withSSRContext } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const query = router.query['username'] as string
  const [loading, setLoading] = useState(false)
  const [, addToast] = useToasts()
  const username = useInput(query ?? '')
  const code = useInput('')
  const password = useInput('')

  const reset = async () => {
    try {
      setLoading(true)
      await Auth.forgotPasswordSubmit(
        username.state,
        code.state,
        password.state
      )

      router.push('/auth/sign-in')
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
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Text h3>Reset your password</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%" size="large">
          Username
        </Input>
        <Spacer />
        <Input type="number" {...code.bindings} width="100%" size="large">
          Verification Code
        </Input>
        <Spacer />
        <Input.Password {...password.bindings} width="100%" size="large">
          New Password
        </Input.Password>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={reset}>
            <Text b>Reset</Text>
          </Button>
          <Spacer className="block sm:hidden" />
          <Row>
            <ChevronLeftIcon color="#0070f3" size={20} />
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

export default ResetPassword
