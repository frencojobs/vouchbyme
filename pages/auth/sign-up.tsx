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
import { NextPage } from 'next'
import NextLink from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState(false)

  const [, addToast] = useToasts()
  const username = useInput('')
  const email = useInput('')
  const password = useInput('')

  const signUp = async () => {
    try {
      setLoading(true)
      const res = await Auth.signUp({
        username: username.state,
        password: password.state,
        attributes: {
          email: email.state,
        },
      })

      if (!res.userConfirmed) {
        Router.push(
          `/auth/confirm?username=${res.user.getUsername()}`,
          '/auth/confirm'
        )
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
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Text h3>Create a new account</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%">
          Username
        </Input>
        <Spacer />
        <Input {...email.bindings} width="100%">
          Email
        </Input>
        <Spacer />
        <Input.Password {...password.bindings} width="100%">
          Password
        </Input.Password>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={signUp}>
            <Text b>Create Account</Text>
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

export default SignUp
