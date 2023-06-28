import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { Controller, UseControllerProps } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import clsx from 'clsx';

type Props = {
  error?: string;
  icon: keyof typeof Feather.glyphMap;
  formProps: UseControllerProps;
  inputProps: TextInputProps;
};

const Input = forwardRef<TextInput, Props>(
  ({ error = '', icon, formProps, inputProps }, ref) => {
    return (
      <Controller
        render={({ field }) => (
          <View style={styles.container}>
            <View style={styles.group}>
              <View style={styles.icon}>
                <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    ['#dc1637']: !!error,
                    ['#8257e5']: !!field.value && !error,
                    ['#999']: !field.value && !error,
                  })}
                />
              </View>

              <TextInput
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                style={styles.control}
                {...inputProps}
              />
            </View>

            {!!error && <Text style={styles.error}>{error}</Text>}
          </View>
        )}
        {...formProps}
      />
    );
  }
);

export { Input };
