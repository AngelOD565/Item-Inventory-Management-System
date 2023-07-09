package com.skillstorm.springaop.aspects;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;                
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skillstorm.springaop.models.Warehouse;

@Component
@Aspect             
public class LoggingAspect {
    

    Logger log = LoggerFactory.getLogger(LoggingAspect.class);



    @Pointcut("within(com.skillstorm.springaop.controllers.ItemController)")   // any method in the ItemController class is now a pointcut
    public void checkItem() {
        
    }

    
    @Pointcut("execution(public * saveWarehouse(com.skillstorm.springaop.models.Warehouse)) && args(warehouseToBeSaved)")  
    public void checkWarehouse(Warehouse warehouseToBeSaved) {

    }



    

    @Before("checkItem()")
    public void request(JoinPoint joinpoint) {

        log.debug("A request was made to {} with the argument(s): {}", 
            joinpoint.getSignature(), 
            Arrays.toString(joinpoint.getArgs()));

    }


    @AfterReturning(value = "checkItem()", returning = "returnedData")
    public void response(JoinPoint joinpoint, Object returnedData) {
        log.debug("A response was sent from {} with the returned data: {}",
            joinpoint.getSignature().getName(),
            returnedData.toString());
    }



    @Around("checkWarehouse(warehouseToBeSaved)")                                                               
    public Warehouse logWarehouses(ProceedingJoinPoint proceedingJoinPoint, Warehouse warehouseToBeSaved) {


        log.debug("DIRECTOR: {}", warehouseToBeSaved.toString());

        if(warehouseToBeSaved.getId() == 0) {
            try {
                proceedingJoinPoint.proceed();
            } catch (Throwable e) {
                log.error("Method could not be executed.", e);
            }

            log.debug("WAREHOUSE WAS CREATED");
        }
        else {
            log.debug("WAREHOUSE WAS NOT CREATED - ALREADY EXISTS");
        }

        return warehouseToBeSaved;
    }


}
