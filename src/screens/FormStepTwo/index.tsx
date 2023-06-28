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

export function FormStepTwo() {
  const { updateFormData } = useAccountForm();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountProps>();

  const phoneRef = useRef<TextInput>(null);

  function handleNextStep(data: AccountProps) {
    updateFormData(data);
    navigate('formStepThree');
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={(2 / 3) * 100} />

      <Text style={styles.title}>Your information</Text>

      <Input
        icon="calendar"
        error={errors.birth?.message}
        formProps={{
          control,
          name: 'birth',
          rules: {
            required: 'The birth date is required',
            pattern: {
              value: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
              message: 'Please enter a valid birth date',
            },
          },
        }}
        inputProps={{
          placeholder: 'Date of Birth',
          onSubmitEditing: () => phoneRef.current?.focus(),
          returnKeyType: 'next',
        }}
      />

      <Input
        ref={phoneRef}
        icon="phone"
        error={errors.phone?.message}
        formProps={{
          control,
          name: 'phone',
          rules: {
            required: 'The phone is required',
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
              message: 'Please enter a valid phone number',
            },
          },
        }}
        inputProps={{
          placeholder: 'Phone Number',
          onSubmitEditing: handleSubmit(handleNextStep),
        }}
      />

      <Button title="Continue" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}
