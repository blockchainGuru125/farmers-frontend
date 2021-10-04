import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import useStake from '../../../../hooks/useStake'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  decimal?: number
}

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid, decimal}) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid, decimal)
  const { stakedBalance } = useFarmUser(pid)

  const rawEarningsBalance = getBalanceNumber(earnings, decimal)
  const displayBalance = rawEarningsBalance.toLocaleString()
  
  
  /* const canHarvest = lockup.isEqualTo(0)
  const harvestBlank = stakedBalance.isEqualTo(0)
  
  
  
  const harvestTime = new Date(lockup.toNumber() * 1000).toISOString().substr(11, 8);
  
  let harvestHelper 
  if (canHarvest || harvestBlank) {
	  harvestHelper = "Harvest"
  }
  else 
  {
	  harvestHelper = harvestTime
  } */

  return (
    <Flex mb='8px' justifyContent='space-between' alignItems='center'>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <BalanceAndCompound>
        {pid === 10 ?  // COMPOUND PID PIDCOMPOUND COMPOUNDPID
          <Button
            disabled={rawEarningsBalance === 0 || pendingTx} // || !canHarvest
            size='sm'
            variant='secondary'
            marginBottom='15px'
            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
          >
            {TranslateString(999, 'Compound')}
          </Button>
          : null}
        <Button
          disabled={rawEarningsBalance === 0 || pendingTx} // || !canHarvest
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
        >
		{/* {canHarvest || harvestBlank ?
		  harvestHelper
		  :
		  harvestTime
		} */ }
		  Harvest
        </Button>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
