# React 
Источник: https://www.youtube.com/watch?v=GNrdg3PzpJQ  
Результат: https://preact-app-2.herokuapp.com/ (логин/пароль - любые символы)  

### Хуки - встроенные функции реакта, которые можно использовать на верхнем уровне
Их нельзя вкладывать в функции, циклы, условия  
```
useState()      - возвращает текущее состояние
useEffect();    - побочные эффекты из функционального компонента
useRef();       - возвращает изменяемый ref-объект
useMemo();      - оптимизация производительности
useCallback();  - вернёт мемоизированную версию колбэка, который изменяется только, если изменяются значения одной из зависимостей
useContext();   - возвращает текущее значение контекста для этого контекста
```

## Дополнительные инстурменты
Анимации - https://reactcommunity.org/react-transition-group/transition-group  
Router - https://reactrouter.com/web/guides/quick-start  

## Жизненный цикл компонента
Монтирование (mount)  
Обновление (update)  
Размонтирование (unmount)  