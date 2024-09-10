"use client";

import TermsAndCondsModal from "@components/TermsAndCondsModal";
import { useDisclosure } from "@mantine/hooks";
import { runningPlans } from "@lib/runningPlans";
import { 
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Radio,
  Select,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import errorMap from "zod/locales/en.js";

const schema = z.object({
  firstName: z.string().min(3,{message:'First Name must have at least 3 characters'}),
  lastName: z.string().min(3,{message:'Last Name must have at least 3 characters'}),
  email: z.string().email({message:'Invalid email address'}),
  plan: z.enum(['funrun','mini','haif','full'],{message:'Please salect a plan'}),
  gender: z.enum(["male", "female"],{message: 'Please salect a gender'}),
  acceptTermAndConds: z.literal(true,{
    errorMap: () => ({message:'First Name must have at least 3 characters'}),
  }),
});

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Container size="500px">
        <Space h="lg" />
        <Title fs="italic" ta="center">
          Register CMU Marathon 🥈
        </Title>
        <Space h="lg" />
        <Stack gap="sm">
          <Group grow align="start">
            <TextInput label="First Name" />
            <TextInput label="Last Name" />
          </Group>
          <TextInput label="Email" />
          <Select
            label="Plan"
            data={runningPlans}
            placeholder="Please select plan..."
          />
          <Space />
          <Radio.Group label="Gender">
            <Radio value="male" label="Male 👨" mb="xs" />
            <Radio value="female" label="Female 👧" />
          </Radio.Group>
          <Space />
          <Checkbox
            label={
              <Text>
                I accept{" "}
                <Anchor onClick={open} href="#">
                  terms and conditions
                </Anchor>
              </Text>
            }
          />
          <Button>Register</Button>
        </Stack>
      </Container>

      <TermsAndCondsModal opened={opened} close={close} />
    </div>
  );
}
