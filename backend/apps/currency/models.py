from django.db import models

class CurrencyRate(models.Model):
    base_currency = models.CharField(max_length=10, default='INR')
    target_currency = models.CharField(max_length=10, unique=True)
    rate = models.DecimalField(max_digits=14, decimal_places=6, help_text="1 INR in target currency")
    inverse_rate = models.DecimalField(max_digits=14, decimal_places=6, help_text="1 Target Currency in INR")
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"1 {self.base_currency} = {self.rate} {self.target_currency}"

    @classmethod
    def get_rates_dict(cls):
        rates = {}
        for cr in cls.objects.filter(is_active=True):
            rates[cr.target_currency] = {
                'rate': float(cr.rate),
                'inverse_rate': float(cr.inverse_rate),
                'last_updated': cr.last_updated.isoformat()
            }
        # Include base INR
        rates['INR'] = {'rate': 1.0, 'inverse_rate': 1.0, 'last_updated': ''}
        return rates
