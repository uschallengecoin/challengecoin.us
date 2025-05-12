<script setup lang="ts">
import {
  computed, nextTick, reactive, ref, watch,
} from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VFormInput from 'UiKit/components/Base/VForm/VFormInput.vue';
import VFormGroup from 'UiKit/components/Base/VForm/VFormGroup.vue';
import { scrollToError } from 'UiKit/helpers/validation/general';
import { isEmpty } from 'UiKit/helpers/general';

const props = defineProps({
  loading: Boolean,
  label: String,
  placeholder: String,
  buttonText: {
    type: String,
    default: 'Subscribe',
  },
});

const emit = defineEmits(['submit']);

type FormModelSubscribe = {
  email: number;
}

const model = reactive({} as FormModelSubscribe);
const validation = ref<unknown>();
const isValid = computed(() => isEmpty(validation.value || {}));
// const isValid = computed(() => validation.value && !Object.keys(validation.value).length);
const isDisabledButton = computed(() => !isValid.value || props.loading);
let schemaSubscribe = {};

const setupValidator = async () => {
  const { JSONSchemaType } = await import('ajv');
  const { emailRule, errorMessageRule } = await import('UiKit/helpers/validation/rules');
  const { PrecompiledValidator } = await import('UiKit/helpers/validation/PrecompiledValidator');

  schemaSubscribe = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions: {
      Individual: {
        properties: {
          email: emailRule,
        },
        type: 'object',
        required: ['email'],
        errorMessage: errorMessageRule,
      },
    },
    $ref: '#/definitions/Individual',
  } as unknown as JSONSchemaType<FormModelSubscribe>;

  return new PrecompiledValidator<FormModelSubscribe>(schemaSubscribe);
};

const validator = ref<PrecompiledValidator<FormModelSubscribe> | null>(null);
setupValidator().then((v) => { validator.value = v; });

const onValidate = () => {
  if (validator.value) {
    validation.value = validator.value.getFormValidationErrors(model);
  }
};

const onSubmit = () => {
  onValidate();
  if (!isValid.value) {
    void nextTick(() => scrollToError('VFormFooterSubscribe'));
    return;
  }

  emit('submit', model.email);
};

watch(() => model, () => {
  if (!isValid.value) onValidate();
}, { deep: true });
</script>

<template>
  <div class="VFormFooterSubscribe v-form-footer-subscribe">
    <form
      novalidate
      @submit.prevent="onSubmit"
    >
      <div
        class="v-form-footer-subscribe__group"
        :class="{ 'is--with-label': label}"
      >
        <VFormGroup
          v-slot="baseFormGroupProps"
          :model="model"
          :validation="validation"
          :schema-front="schemaSubscribe"
          :label="label"
          dark
          path="email"
        >
          <VFormInput
            :is-error="baseFormGroupProps.isFieldError"
            :model-value="model.email"
            :placeholder="placeholder"
            type="email"
            size="large"
            @update:model-value="model.email = $event"
          />
          <VButton
            size="large"
            :loading="loading"
            :disabled="isDisabledButton || loading"
            class="v-form-footer-subscribe__button is--margin-top-0"
          >
            {{ buttonText }}
          </VButton>
        </VFormGroup>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.v-form-footer-subscribe {
  &__group {
    display: flex;
    gap: 8px;
    width: 100%;
    text-align: left;

    @media screen and (width < $tablet){
      flex-direction: column;
    }
  }

  &__button {
    position: relative;

    @media screen and (width < $tablet){
      width: 100%;
    }
  }

  .v-form-group {
    width: 100%;
  }

  .v-form-group__input {
    @media screen and (width < $tablet){
      flex-direction: column;
    }
  }
}
</style>
