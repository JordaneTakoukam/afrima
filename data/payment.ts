import type { PaymentMethod } from '@/lib/types';

/** Payment options shown across the shop and selectable at checkout. */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'mtn-momo',
    name: { en: 'MTN MoMo', fr: 'MTN MoMo' },
    blurb: {
      en: 'Pay instantly with MTN Mobile Money.',
      fr: 'Payez instantanément avec MTN Mobile Money.',
    },
    color: '#FFCB05',
  },
  {
    id: 'orange-money',
    name: { en: 'Orange Money', fr: 'Orange Money' },
    blurb: {
      en: 'Pay from your Orange Money wallet.',
      fr: 'Payez depuis votre portefeuille Orange Money.',
    },
    color: '#FF7900',
  },
  {
    id: 'card',
    name: { en: 'Visa · Mastercard', fr: 'Visa · Mastercard' },
    blurb: {
      en: 'Credit or debit card, secured.',
      fr: 'Carte de crédit ou débit, sécurisée.',
    },
    color: '#1A1F71',
  },
  {
    id: 'paypal',
    name: { en: 'PayPal', fr: 'PayPal' },
    blurb: {
      en: 'Check out with your PayPal balance.',
      fr: 'Payez avec votre solde PayPal.',
    },
    color: '#003087',
  },
  {
    id: 'bank-transfer',
    name: { en: 'Bank transfer', fr: 'Virement bancaire' },
    blurb: {
      en: 'Direct transfer to our bank account.',
      fr: 'Virement direct vers notre compte bancaire.',
    },
    color: '#15803D',
  },
];
