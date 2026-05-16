import { computed, reactive, ref } from 'vue'

export const RSVP_STATUS = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error'
}

const mockSubmitRsvp = (payload) => {
  // TODO: replace with real backend request, e.g. fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(payload) })
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (payload.message && payload.message.toLowerCase().includes('[fail]')) {
        reject(new Error('Mock submit failed'))
        return
      }
      resolve({ ok: true })
    }, 1300)
  })
}

export const useRSVP = (guest) => {
  const status = ref(RSVP_STATUS.IDLE)
  const submitError = ref('')

  const form = reactive({
    guestCount: '1 người',
    message: ''
  })

  const isSubmitting = computed(() => status.value === RSVP_STATUS.SUBMITTING)

  const submit = async () => {
    submitError.value = ''
    status.value = RSVP_STATUS.SUBMITTING

    try {
      await mockSubmitRsvp({
        guestSlug: guest?.slug || null,
        guestDisplayName: guest?.displayName || 'anh/chị',
        guestCount: form.guestCount,
        message: form.message
      })
      status.value = RSVP_STATUS.SUCCESS
    } catch (_error) {
      status.value = RSVP_STATUS.ERROR
      submitError.value = 'Gửi xác nhận chưa thành công. Vui lòng thử lại trong giây lát.'
    }
  }

  const reset = () => {
    status.value = RSVP_STATUS.IDLE
    submitError.value = ''
    form.guestCount = '1 người'
    form.message = ''
  }

  return {
    RSVP_STATUS,
    status,
    form,
    submitError,
    isSubmitting,
    submit,
    reset
  }
}
