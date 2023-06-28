import { useRef } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { AccountProps } from '../../contexts/AccountFormContext';
import { useAccountForm } from '../../hooks/useAccountForm';

import { styles } from './styles';
import { ProgressBar } from '../../components/ProgressBar';

export function FormStepThree() {
  const { navigate } = useNavigation();
  const { updateFormData } = useAccountForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AccountProps>();

  const passwordConfirmationRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate('finish');
  }

  function validatePasswordConfirmation(passwordConfirmation: string) {
    const { password } = getValues();

    return passwordConfirmation === password || 'The password does not match';
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={(3 / 3) * 100} />

      <Text style={styles.title}>Set your password</Text>

      <Input
        icon="key"
        error={errors.password?.message}
        formProps={{
          control,
          name: 'password',
          rules: {
            required: 'The password is required',
            minLength: {
              value: 6,
              message: 'The password must be at least 6 characters long',
            },
          },
        }}
        inputProps={{
          placeholder: 'Password',
          onSubmitEditing: () => passwordConfirmationRef.current?.focus(),
          returnKeyType: 'next',
          secureTextEntry: true,
        }}
      />

      <Input
        ref={passwordConfirmationRef}
        icon="key"
        error={errors.passwordConfirmation?.message}
        formProps={{
          control,
          name: 'passwordConfirmation',
          rules: {
            required: 'The password confirmation is required',
            validate: validatePasswordConfirmation,
          },
        }}
        inputProps={{
          placeholder: 'Password Confirmation',
          onSubmitEditing: handleSubmit(handleNextStep),
          secureTextEntry: true,
        }}
      />

      <Button title="Register" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
