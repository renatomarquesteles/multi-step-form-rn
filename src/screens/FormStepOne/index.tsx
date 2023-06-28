import { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ProgressBar } from '../../components/ProgressBar';
import { AccountProps } from '../../contexts/AccountFormContext';
import { useAccountForm } from '../../hooks/useAccountForm';

import { styles } from './styles';

export function FormStepOne() {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const emailRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate('formStepTwo');
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={(1 / 3) * 100} />

      <Text style={styles.title}>Create your account</Text>

      <Input
        icon="user"
        error={errors.name?.message}
        formProps={{
          control,
          name: 'name',
          rules: {
            required: 'The name is required',
          },
        }}
        inputProps={{
          placeholder: 'Name',
          onSubmitEditing: () => emailRef.current?.focus(),
          returnKeyType: 'next',
        }}
      />

      <Input
        ref={emailRef}
        icon="mail"
        error={errors.email?.message}
        formProps={{
          control,
          name: 'email',
          rules: {
            required: 'The email is required',
            pattern: {
              value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i,
              message: 'Please enter a valid email',
            },
          },
        }}
        inputProps={{
          placeholder: 'Email Address',
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continue" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
