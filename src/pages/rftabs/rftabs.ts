import { Component } from '@angular/core';
import { RfwalletPage } from '../rfwallet/rfwallet';
import { RechargehistoryPage } from '../rechargehistory/rechargehistory';
import { CredithistoryPage } from '../credithistory/credithistory';

@Component({
  selector: 'page-rftabs',
  templateUrl: 'rftabs.html',
})
export class RftabsPage {

  rfwalletPage = RfwalletPage;
  rechargehistoryPage = RechargehistoryPage;
  CredithistoryPage = CredithistoryPage;

}
